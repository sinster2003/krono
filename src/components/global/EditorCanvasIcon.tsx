import { EditorCanvasCardType } from '@/store/useEditor'
import React from 'react'
import { Slack, Discord, GoogleDrive, Notion } from './Icons'

const EditorCanvasIcon = ({ type }: { type: EditorCanvasCardType["type"] }) => {
    switch (type) {
        case "slack":
            return <Slack/>
        case "discord":
            return <Discord/>
        case "googleDrive":
            return <GoogleDrive/>
        case "notion":
            return <Notion/>
    }
}

export default EditorCanvasIcon