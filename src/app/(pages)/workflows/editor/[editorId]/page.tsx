import EditorCanvas from '@/components/global/EditorCanvas';
import React from 'react'

const EditorPage = async ({ params }: any) => {
    try {
        const { editorId } = await params;
        console.log(editorId);
        return (
            // editor provider providers state for nodes and edges of the workflow
            // connections provider providers states for connections like discord, google drive, slack and notion
            <EditorCanvas />
        )
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export default EditorPage;