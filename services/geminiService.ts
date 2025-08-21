
import { GoogleGenAI } from "@google/genai";
import { GenerationConfig } from '../types';

const LOADING_MESSAGES = [
    "Warming up the digital canvas...",
    "Teaching pixels to dance in harmony...",
    "Composing a symphony of light and sound...",
    "Gathering stardust for your creation...",
    "This can take a few minutes. Great art needs patience!",
    "Assembling the final frames with precision...",
    "Rendering your high-definition masterpiece...",
    "Finalizing the audio-visual experience...",
];

interface GenerateVideoParams extends GenerationConfig {
    onProgress: (message: string) => void;
}

export async function generateVideo({
    prompt,
    imageBase64,
    aspectRatio,
    enableSound,
    resolution,
    onProgress
}: GenerateVideoParams): Promise<string> {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const payload: any = {
        model: 'veo-2.0-generate-001',
        prompt: prompt,
        config: {
            numberOfVideos: 1,
            aspectRatio: aspectRatio,
            enableSound: enableSound,
            resolution: resolution,
        },
    };

    if (imageBase64) {
        const [meta, data] = imageBase64.split(',');
        const mimeType = meta.match(/:(.*?);/)?.[1] || 'image/png';
        payload.image = {
            imageBytes: data,
            mimeType: mimeType,
        };
    }

    onProgress(LOADING_MESSAGES[0]);
    let operation = await ai.models.generateVideos(payload);

    let messageIndex = 1;
    while (!operation.done) {
        onProgress(LOADING_MESSAGES[messageIndex % LOADING_MESSAGES.length]);
        messageIndex++;
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (!downloadLink) {
        throw new Error("Video generation failed or the API returned no download link.");
    }

    onProgress("Almost there! Downloading your video...");
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to download video: ${response.statusText} - ${errorText}`);
    }

    const videoBlob = await response.blob();
    return URL.createObjectURL(videoBlob);
}
