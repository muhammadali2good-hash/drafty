import { PlatformType } from '../types';

declare global {
  interface Window {
    puter?: {
      ai: {
        chat: (prompt: string | any[]) => Promise<any>;
        txt2img: (prompt: string) => Promise<HTMLImageElement | any>;
      };
    };
  }
}

export interface AICopyRequest {
  idea: string;
  audience?: string;
  goal?: string;
  product?: string;
  tone?: string;
  cta?: string;
  keywords?: string;
  platform: PlatformType;
  format?: string;
}

export interface AIImageRequest {
  prompt: string;
  platform: PlatformType;
  style?: string;
  brandCategory?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  bgColor?: string;
  lighting?: string;
  camera?: string;
  depth?: string;
  composition?: string;
  negativePrompt?: string;
  aspectRatio?: string;
  mood?: string;
  brandColors?: string;
}

export interface AIImageResult {
  url: string;
  expandedPrompt: string;
}

// Check Puter availability
export function isPuterAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.puter !== 'undefined' && !!window.puter.ai;
}

/**
 * Generate Instagram Carousel Slides via Puter.js AI
 */
export async function generateInstagramCarouselSlides(
  topic: string,
  slideCount: number = 5
): Promise<string[]> {
  const promptText = `You are an expert Instagram content creator and visual carousel designer.
Create a structured ${slideCount}-slide Instagram carousel on the topic/caption: "${topic}".

Format requirements:
- Return ONLY a JSON array of strings, where each string represents one slide text.
- Slide 1 MUST be a high-converting hook title/headline.
- Middle slides should cover clear actionable tips, key data points, or concise advice.
- The last slide MUST be a strong Call to Action (e.g. Save, Share, Comment below).
- Keep each slide text clear, engaging, and under 25 words.

Example output format:
["Slide 1: 5 Secrets to Double Your Reach 🚀", "Slide 2: 1. Post at high-engagement creator hours", "Slide 3: 2. Write saveable carousel slides", "Slide 4: 3. Reply to early comments within 30m", "Slide 5: Save this post to level up your content strategy! 📌"]`;

  try {
    if (isPuterAvailable()) {
      const response = await window.puter!.ai.chat(promptText);
      let outputText = typeof response === 'string' ? response : response?.message?.content || response?.toString() || '';
      
      if (outputText.trim()) {
        const jsonMatch = outputText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0]);
            if (Array.isArray(parsed) && parsed.length > 0) {
              return parsed.map((s: any) => String(s).trim());
            }
          } catch (e) {
            console.warn('Failed to parse JSON array from Puter AI response, falling back to line split');
          }
        }

        const lines = outputText
          .split('\n')
          .map(l => l.replace(/^[0-9]+[\.\)]\s*/, '').replace(/^[-*]\s*/, '').trim())
          .filter(l => l.length > 3 && !l.startsWith('[') && !l.startsWith(']'));
        if (lines.length >= 2) {
          return lines;
        }
      }
    }
  } catch (err) {
    console.warn('Puter AI carousel generation failed or offline, falling back:', err);
  }

  // Fallback Carousel Slides
  return [
    `Slide 1: Hook - ${topic || 'High Impact Carousel Strategy'} 🚀`,
    `Slide 2: Tip 1 - Focus on high-value visual takeaways`,
    `Slide 3: Tip 2 - Use rhythmic typography and high contrast`,
    `Slide 4: Tip 3 - Keep spacing clean and scannable`,
    `Slide 5: Save & share this post with fellow creators! 📌`,
  ];
}

/**
 * Regenerate or refine a single Instagram carousel slide using Puter AI
 */
export async function generateSingleSlideAI(
  topic: string,
  slideIndex: number,
  currentText?: string
): Promise<string> {
  const promptText = `You are an Instagram content specialist.
Refine or write Slide #${slideIndex + 1} for an Instagram carousel about: "${topic}".
Current draft: "${currentText || ''}"

Make it punchy, engaging, scannable, and under 20 words.
Return ONLY the slide text with no quotes or extra conversational commentary.`;

  try {
    if (isPuterAvailable()) {
      const response = await window.puter!.ai.chat(promptText);
      let outputText = typeof response === 'string' ? response : response?.message?.content || response?.toString() || '';
      if (outputText.trim()) {
        return outputText.trim().replace(/^["']|["']$/g, '');
      }
    }
  } catch (err) {
    console.warn('Puter AI single slide generation failed:', err);
  }

  return currentText ? `${currentText} ✨` : `Slide #${slideIndex + 1}: Key insight on ${topic}`;
}

/**
 * Generate Platform-Specific Copy via Puter.js or Fallback AI
 */
export async function generateAICopy(req: AICopyRequest): Promise<{ copy: string; title: string; variants: string[]; hashtags: string[] }> {
  const { idea, audience = 'General Creators', goal = 'Engagement & Authority', tone = 'High Conversion', cta = 'Comment your thoughts below', keywords = '', platform } = req;

  const promptText = `You are Drafty AI, an expert social copywriter.
Target Platform: ${platform.toUpperCase()}
Core Idea: "${idea}"
Audience: ${audience}
Goal: ${goal}
Tone: ${tone}
Call To Action: ${cta}
Keywords: ${keywords}

Write highly engaging, emotionally resonant, platform-optimized copy for ${platform.toUpperCase()}.
Rules for ${platform.toUpperCase()}:
${
  platform === 'x'
    ? '- Keep main tweet under 280 characters OR provide a numbered thread format (1/, 2/, 3/). Include 2 relevant hashtags.'
    : platform === 'reddit'
    ? '- Authentic discussion tone, no marketing spam, proper markdown formatting with bold points and friendly community opening.'
    : platform === 'instagram'
    ? '- Catchy visual hook, structured carousel/caption breakdown, generous line breaks, 5-8 hyper-relevant hashtags.'
    : platform === 'facebook'
    ? '- Storytelling style, clear paragraph spacing, engaging hook, CTA question at the end.'
    : platform === 'email'
    ? '- Subject line, preheader text, warm personal opening, structured bullet highlights, clear action link CTA.'
    : '- Clear structure, polished markdown, summary bullet points.'
}
Return the copy directly with no conversational fluff.`;

  try {
    if (isPuterAvailable()) {
      const response = await window.puter!.ai.chat(promptText);
      let outputText = typeof response === 'string' ? response : response?.message?.content || response?.toString() || '';
      
      if (outputText.trim()) {
        const title = extractTitleFromText(outputText, idea);
        const variants = generateCopyVariants(outputText, platform);
        const hashtags = extractHashtags(outputText, keywords);
        return { copy: outputText.trim(), title, variants, hashtags };
      }
    }
  } catch (err) {
    console.warn('Puter AI chat call failed or offline, falling back to local generator:', err);
  }

  // Smart local generator fallback
  return generateFallbackCopy(req);
}

/**
 * Builds an automated, structured prompt for Puter AI
 */
export function buildStructuredPrompt(req: AIImageRequest): string {
  const {
    prompt,
    platform,
    aspectRatio = '16:9',
    style = 'Modern',
    brandCategory = 'Technology',
    primaryColor = '#10b981',
    secondaryColor = '#064e3b',
    accentColor = '#14b8a6',
    bgColor = '#040806',
    lighting = 'Studio',
    camera = 'Wide',
    depth = 'Deep',
    composition = 'Centered',
    negativePrompt = 'blurry, low quality, watermark, extra fingers, cropped, text, logo, distorted, bad anatomy, duplicate objects, low resolution, poor lighting, compression artifacts',
  } = req;

  return `Create a high quality ${style} style marketing image for ${brandCategory}.

Purpose: Social media marketing graphic.
Platform: ${platform.toUpperCase()}
Aspect Ratio: ${aspectRatio}
Brand Category: ${brandCategory}
Visual Style: ${style}
Brand Palette: Primary ${primaryColor}, Secondary ${secondaryColor}, Accent ${accentColor}, Background ${bgColor}
User Concept: ${prompt}
Lighting: ${lighting}
Camera Angle: ${camera}
Depth of Field: ${depth}
Composition: ${composition}
${negativePrompt ? `Negative Prompt (Avoid): ${negativePrompt}\n` : ''}
Requirements: High resolution 8k quality, professional graphic composition, balanced spacing, no watermark, no text artifacts, modern studio lighting, marketing ready, crisp details.`;
}

/**
 * Generate Image via Puter.js AI (puter.ai.txt2img)
 */
export async function generateAIImage(req: AIImageRequest): Promise<AIImageResult> {
  const structuredPrompt = buildStructuredPrompt(req);

  // 1. Official Puter.js AI txt2img Call
  if (isPuterAvailable()) {
    try {
      const imgRes = await window.puter!.ai.txt2img(structuredPrompt);
      if (imgRes) {
        let imageUrl = '';
        if (typeof imgRes === 'string' && imgRes.length > 0) {
          imageUrl = imgRes;
        } else if (imgRes instanceof HTMLImageElement && imgRes.src) {
          imageUrl = imgRes.src;
        } else if (typeof imgRes === 'object' && imgRes !== null) {
          if ('src' in imgRes && typeof (imgRes as any).src === 'string' && (imgRes as any).src) {
            imageUrl = (imgRes as any).src;
          } else if ('url' in imgRes && typeof (imgRes as any).url === 'string' && (imgRes as any).url) {
            imageUrl = (imgRes as any).url;
          }
        }
        if (imageUrl) {
          return { url: imageUrl, expandedPrompt: structuredPrompt };
        }
      }
    } catch (err: any) {
      console.error('Puter AI image generation failed:', err);
      const errMsg = err?.message || err?.toString() || 'Puter AI generation error';
      throw new Error(`Puter AI Error: ${errMsg}`);
    }
  }

  // 2. Real-time AI image generation fallback using Pollinations AI engine with exact structured prompt
  const { aspectRatio = '16:9' } = req;
  let w = 1200;
  let h = 675;
  if (aspectRatio === '1:1') { w = 800; h = 800; }
  else if (aspectRatio === '4:5') { w = 800; h = 1000; }
  else if (aspectRatio === '9:16') { w = 720; h = 1280; }
  else if (aspectRatio === '4:3') { w = 800; h = 600; }
  else if (aspectRatio === '3:2') { w = 900; h = 600; }
  else if (aspectRatio === '2:3') { w = 600; h = 900; }
  else if (aspectRatio === '21:9') { w = 1260; h = 540; }

  const seed = Math.floor(Math.random() * 10000000);
  const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(structuredPrompt)}?width=${w}&height=${h}&seed=${seed}&nologo=true&enhance=true`;

  return { url: pollinationsUrl, expandedPrompt: structuredPrompt };
}

/**
 * Generate a procedural visual graphic mockup based on user instructions and aspect ratio
 */
export function generateCanvasMockupImage(req: AIImageRequest): string {
  const { prompt, style = 'Modern Illustration', mood = 'Aesthetic', aspectRatio = '16:9', platform } = req;

  let w = 1200;
  let h = 675;
  if (aspectRatio === '1:1') { w = 800; h = 800; }
  else if (aspectRatio === '4:5') { w = 800; h = 1000; }
  else if (aspectRatio === '9:16') { w = 720; h = 1280; }
  else if (aspectRatio === '4:3') { w = 800; h = 600; }
  else if (aspectRatio === '3:2') { w = 900; h = 600; }
  else if (aspectRatio === '2:3') { w = 600; h = 900; }
  else if (aspectRatio === '21:9') { w = 1260; h = 540; }

  if (typeof document === 'undefined') {
    const seed = Math.floor(Math.random() * 100000);
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${w}&height=${h}&seed=${seed}&nologo=true`;
  }

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const seed = Math.floor(Math.random() * 100000);
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${w}&height=${h}&seed=${seed}&nologo=true`;
  }

  // Background Gradient
  const grad = ctx.createLinearGradient(0, 0, w, h);
  if (platform === 'x') {
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#042f2e');
    grad.addColorStop(1, '#064e3b');
  } else if (platform === 'instagram') {
    grad.addColorStop(0, '#1e1b4b');
    grad.addColorStop(0.5, '#831843');
    grad.addColorStop(1, '#064e3b');
  } else if (platform === 'reddit') {
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#431407');
    grad.addColorStop(1, '#064e3b');
  } else {
    grad.addColorStop(0, '#022c22');
    grad.addColorStop(0.5, '#064e3b');
    grad.addColorStop(1, '#0f172a');
  }

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Decorative ambient circles
  ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
  ctx.beginPath();
  ctx.arc(w * 0.82, h * 0.22, Math.min(w, h) * 0.42, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(20, 184, 166, 0.15)';
  ctx.beginPath();
  ctx.arc(w * 0.18, h * 0.82, Math.min(w, h) * 0.38, 0, Math.PI * 2);
  ctx.fill();

  // Central Card Container
  const pad = Math.min(w, h) * 0.08;
  const cardW = w - pad * 2;
  const cardH = h - pad * 2;
  const cardX = pad;
  const cardY = pad;

  ctx.fillStyle = 'rgba(6, 15, 11, 0.75)';
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
  ctx.lineWidth = 3;

  const r = 24;
  ctx.beginPath();
  ctx.moveTo(cardX + r, cardY);
  ctx.lineTo(cardX + cardW - r, cardY);
  ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + r);
  ctx.lineTo(cardX + cardW, cardY + cardH - r);
  ctx.quadraticCurveTo(cardX + cardW, cardY + cardH, cardX + cardW - r, cardY + cardH);
  ctx.lineTo(cardX + r, cardY + cardH);
  ctx.quadraticCurveTo(cardX, cardY + cardH, cardX, cardY + cardH - r);
  ctx.lineTo(cardX, cardY + r);
  ctx.quadraticCurveTo(cardX, cardY, cardX + r, cardY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Header Badge
  ctx.fillStyle = '#10b981';
  ctx.font = `bold ${Math.max(14, Math.floor(h * 0.032))}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(`${platform.toUpperCase()} • ${style.toUpperCase()}`, cardX + 36, cardY + 54);

  // User Prompt Text
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${Math.max(20, Math.floor(h * 0.046))}px "Plus Jakarta Sans", sans-serif`;

  const words = prompt.split(' ');
  let line = '';
  let y = cardY + 115;
  const maxW = cardW - 72;
  const lineHeight = Math.max(30, Math.floor(h * 0.058));

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxW && i > 0) {
      ctx.fillText(line.trim(), cardX + 36, y);
      line = words[i] + ' ';
      y += lineHeight;
      if (y > cardY + cardH - 90) break;
    } else {
      line = testLine;
    }
  }
  if (line && y <= cardY + cardH - 90) {
    ctx.fillText(line.trim(), cardX + 36, y);
  }

  // Subtitle / Mood Footer
  ctx.fillStyle = 'rgba(236, 253, 245, 0.75)';
  ctx.font = `500 ${Math.max(12, Math.floor(h * 0.026))}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(`✨ Mood: ${mood || 'Aesthetic AI'} • Created with Drafty AI Studio`, cardX + 36, cardY + cardH - 36);

  return canvas.toDataURL('image/jpeg', 0.92);
}

// Helper utilities
function extractTitleFromText(text: string, fallback: string): string {
  const firstLine = text.split('\n')[0].replace(/^[#*\-🚀✨📢📢💡]\s*/, '').trim();
  if (firstLine.length > 5 && firstLine.length < 80) return firstLine;
  return fallback.length > 40 ? fallback.slice(0, 40) + '...' : fallback;
}

function extractHashtags(text: string, keywords: string): string[] {
  const matches = text.match(/#[a-zA-Z0-9_]+/g);
  if (matches && matches.length > 0) return Array.from(new Set(matches));
  if (keywords) {
    return keywords.split(/[\s,]+/).filter(Boolean).map(k => `#${k.replace(/^#/, '')}`);
  }
  return ['#ContentCreator', '#DraftyAI', '#Productivity'];
}

function generateCopyVariants(mainText: string, platform: PlatformType): string[] {
  return [
    `🔥 Short Variant:\n${mainText.slice(0, 140)}...`,
    `💡 Question Hook:\nHave you ever wondered about this? ${mainText.slice(0, 160)}...`,
    `✨ Bullet Summary:\n• ${mainText.split('\n').filter(Boolean).slice(0, 3).join('\n• ')}`,
  ];
}

function generateFallbackCopy(req: AICopyRequest): { copy: string; title: string; variants: string[]; hashtags: string[] } {
  const { idea, goal, tone, cta, platform } = req;

  let copy = '';
  let title = idea.slice(0, 40);

  if (platform === 'x') {
    title = `🚀 Thread: ${idea}`;
    copy = `1/ ${idea}\n\nHere's why this matters for creators looking for ${goal.toLowerCase()} 👇\n\n2/ The biggest mistake most people make is ignoring micro-friction.\n\n3/ When you simplify your workflow with isolated platform tools, output doubles.\n\n4/ ${cta}! 🌿 #CreatorEconomy #DraftyAI`;
  } else if (platform === 'reddit') {
    title = `How we addressed ${idea} (Detailed breakdown)`;
    copy = `Hey everyone,\n\nI wanted to share our experience with ${idea}.\n\nGoal: ${goal}\nTone: ${tone}\n\n### Key Learnings:\n- Keep interfaces minimal with 24-28px rounded containers.\n- Focus on local-first data caching.\n- Eliminate clutter.\n\n${cta}`;
  } else if (platform === 'instagram') {
    title = `✨ ${idea}`;
    copy = `✨ ${idea}\n\nSlide 1: The Core Concept\nSlide 2: Step-by-Step Execution\nSlide 3: Pro Tip for Creators\nSlide 4: Key Takeaway\n\n📌 Save this post for your next draft!\n💬 ${cta}\n\n#ContentCreator #VisualDesign #DraftyAI #CreatorWorkspace`;
  } else if (platform === 'email') {
    title = `Newsletter Draft: ${idea}`;
    copy = `SUBJECT: ${idea} 🌿\nPREHEADER: Quick breakdown on ${goal}\n\nHi {{Name}},\n\nHope your week is going great!\n\nToday I wanted to dive into: ${idea}.\n\nKey takeaways:\n• Streamlined workflow\n• High engagement copy\n• Zero distraction\n\n${cta}\n\nBest,\nThe Drafty Team`;
  } else {
    title = `Draft: ${idea}`;
    copy = `# ${idea}\n\n**Goal:** ${goal}\n**Tone:** ${tone}\n\n## Summary\n${idea} is designed to streamline creative output without unnecessary dashboard noise.\n\n## Action Plan\n- [ ] Review structure\n- [ ] Attach media assets\n- [ ] Publish to target channel`;
  }

  return {
    copy,
    title,
    variants: generateCopyVariants(copy, platform),
    hashtags: ['#CreatorEconomy', '#DraftyAI', '#ContentWorkspace'],
  };
}
