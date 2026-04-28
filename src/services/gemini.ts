/**
 * Client-side service that proxies research requests to our backend for security.
 */

export type ResearchStep = 'understanding' | 'searching' | 'extracting' | 'summarizing' | 'deduplicating' | 'synthesizing' | 'completed';

export interface ResearchProgress {
  step: ResearchStep;
  message: string;
}

export async function performResearch(
  query: string,
  onProgress: (progress: ResearchProgress) => void
): Promise<string> {
  try {
    // Artificial progress updates to match the UI's pipeline animation
    onProgress({ step: 'understanding', message: "Analyzing search intent and expanding query..." });
    await new Promise(r => setTimeout(r, 1000));

    onProgress({ step: 'searching', message: "Searching authoritative sources across the web..." });
    await new Promise(r => setTimeout(r, 1000));

    onProgress({ step: 'extracting', message: "Extracting key findings from relevant sources..." });
    await new Promise(r => setTimeout(r, 1000));

    onProgress({ step: 'summarizing', message: "Summarizing statistical data and unique insights..." });
    await new Promise(r => setTimeout(r, 1000));

    onProgress({ step: 'deduplicating', message: "Cleaning data and removing redundant information..." });
    await new Promise(r => setTimeout(r, 800));

    onProgress({ step: 'synthesizing', message: "Synthesizing final research report with grounded citations..." });

    const response = await fetch("/api/research", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to communicate with research engine.");
    }

    onProgress({ step: 'completed', message: "Research complete." });
    return data.text;
  } catch (error: any) {
    console.error("Research Error:", error);
    throw new Error(`Research Blocked: ${error.message || "An unexpected error occurred."}`);
  }
}
