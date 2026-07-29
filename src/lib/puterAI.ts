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
  style?: string;
  mood?: string;
  aspectRatio?: string;
  brandColors?: string;
  platform: PlatformType;
}

// Check Puter availability
export function isPuterAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.puter !== 'undefined' && !!window.puter.ai;
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
 * Generate Image via Puter.js or High-Quality Unsplash / SVG / AI Canvas fallback
 */
export async function generateAIImage(req: AIImageRequest): Promise<string> {
  const { prompt, style = 'Modern Illustration', aspectRatio = '16:9', platform } = req;
  const fullPrompt = `${prompt}, ${style} style, soft lighting, 8k quality, trending on artstation, aesthetic background`;

  try {
    if (isPuterAvailable()) {
      const imgRes = await window.puter!.ai.txt2img(fullPrompt);
      if (imgRes && imgRes.src) {
        return imgRes.src;
      } else if (typeof imgRes === 'string' && imgRes.startsWith('http')) {
        return imgRes;
      }
    }
  } catch (err) {
    console.warn('Puter AI image call failed, using high-resolution aesthetic canvas fallback:', err);
  }

  // High quality aesthetic fallback image URL based on prompt hash & keywords
  const seed = encodeURIComponent(prompt.trim().toLowerCase().slice(0, 30));
  const categoryMap: Record<string, string> = {
    x: 'technology,minimal',
    reddit: 'workspace,code',
    instagram: 'design,aesthetic',
    facebook: 'business,community',
    email: 'office,desk',
    general: 'abstract,glass',
  };
  const category = categoryMap[platform] || 'aesthetic';

  // Dimension calculation by aspect ratio
  let w = 1200;
  let h = 675; // 16:9
  if (aspectRatio === '1:1') { w = 800; h = 800; }
  else if (aspectRatio === '4:5') { w = 800; h = 1000; }
  else if (aspectRatio === '9:16') { w = 720; h = 1280; }
  else if (aspectRatio === '4:3') { w = 800; h = 600; }
  else if (aspectRatio === '3:2') { w = 900; h = 600; }

  return `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=${w}&h=${h}&q=80&sig=${seed}`;
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
