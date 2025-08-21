
import React, { useState, useCallback } from 'react';
import { MagicWandIcon } from './components/icons';
import { generateVideo } from './services/geminiService';
import { AspectRatio, Resolution, GenerationConfig } from './types';
import { ConfigOptions } from './components/ConfigOptions';
import { ImageUpload } from './components/ImageUpload';
import { VideoOutput } from './components/VideoOutput';
import { Loader } from './components/Loader';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('A neon hologram of a cat driving a futuristic car at top speed through a cyberpunk city.');
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
    const [resolution, setResolution] = useState<Resolution>('720p');
    const [enableSound, setEnableSound] = useState<boolean>(true);
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

    const handleGenerateClick = useCallback(async () => {
        if (!prompt.trim()) {
            setError("Prompt cannot be empty.");
            return;
        }

        setError(null);
        setGeneratedVideoUrl(null);
        setIsLoading(true);

        const config: GenerationConfig = {
            prompt,
            imageBase64,
            aspectRatio,
            enableSound,
            resolution,
        };

        try {
            const videoUrl = await generateVideo({
                ...config,
                onProgress: (message: string) => setLoadingMessage(message),
            });
            setGeneratedVideoUrl(videoUrl);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An unknown error occurred during video generation.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt, imageBase64, aspectRatio, enableSound, resolution]);


    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
            {isLoading && <Loader message={loadingMessage} />}
            <header className="bg-gray-800 shadow-lg">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center">
                    <MagicWandIcon className="w-8 h-8 text-indigo-400 mr-3" />
                    <h1 className="text-2xl font-bold tracking-tight text-white">VEO 3 Video Generator</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    {/* Left Column: Inputs & Config */}
                    <div className="space-y-8">
                        <div>
                            <label htmlFor="prompt" className="block text-lg font-semibold text-white mb-2">
                                Prompt
                            </label>
                            <textarea
                                id="prompt"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="e.g., A majestic lion roaring on a cliff at sunrise"
                                className="w-full h-36 p-4 bg-gray-800 border-2 border-gray-700 rounded-lg shadow-inner focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                disabled={isLoading}
                            />
                        </div>

                        <ImageUpload imageBase64={imageBase64} setImageBase64={setImageBase64} disabled={isLoading} />
                        <ConfigOptions 
                            aspectRatio={aspectRatio}
                            setAspectRatio={setAspectRatio}
                            resolution={resolution}
                            setResolution={setResolution}
                            enableSound={enableSound}
                            setEnableSound={setEnableSound}
                            disabled={isLoading}
                        />

                        <button
                            onClick={handleGenerateClick}
                            disabled={isLoading || !prompt.trim()}
                            className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                        >
                            <MagicWandIcon className="w-6 h-6 mr-3" />
                            {isLoading ? 'Generating...' : 'Generate Video'}
                        </button>

                         {error && (
                            <div className="mt-4 p-4 bg-red-900 border border-red-700 text-red-200 rounded-lg text-center">
                                <p><strong>Error:</strong> {error}</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Output */}
                    <div className="lg:sticky lg:top-8">
                        {generatedVideoUrl ? (
                            <VideoOutput videoUrl={generatedVideoUrl} />
                        ) : (
                            <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-[80vh] flex flex-col items-center justify-center text-center">
                                <div className="w-24 h-24 text-gray-600 border-4 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.55a2 2 0 01.45 2.12l-2.03 4.05A2 2 0 0116.1 18H4a2 2 0 01-2-2V8a2 2 0 012-2h9.1a2 2 0 011.87 1.25L15 10zM5 6v12m14-6H9" /></svg>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-white">Your Video Awaits</h3>
                                <p className="mt-2 text-sm text-gray-400">Your generated video will appear here once it's ready.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
