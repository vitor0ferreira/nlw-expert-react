import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

interface NewNoteCardProps {
  onNewNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export default function NewNoteCard ({onNewNoteCreated}:NewNoteCardProps) {
  const [showOnBoarding, setShowOnBoarding] = useState(true)
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState<boolean>(false)

  function handleSelectOnlyText() {
    setShowOnBoarding(false)
  }

  function handleContentChanged(event:ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if(event.target.value == ''){
      setShowOnBoarding(true)
    }
  }

  function handleSaveNote(event:FormEvent<HTMLButtonElement>) {
    event.preventDefault()

    if(content !== ''){
      toast.success('Nota criada com sucesso !')
      onNewNoteCreated(content)
      setContent('')
      setShowOnBoarding(true)
    } else {
      toast.error('Impossível criar uma nota vazia.')
      return
    }
  }

  function handleStartRecording() {

    const isSpeechRecognitionAPIAvailable = 'SpeechRecognitionAPI' in window || 'webkitSpeechRecognition' in window

    if(!isSpeechRecognitionAPIAvailable){
      alert('Infelizmente seu navegador não suporta essa funcionalidade.')
      return
    }

    setIsRecording(true)
    setShowOnBoarding(false)
    
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    speechRecognition = new SpeechRecognitionAPI()
    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result)=>{
        return text.concat(result[0].transcript)
      }, '')
      setContent(transcription)
    }

    speechRecognition.start()
    speechRecognition.onerror = (event) => {
      console.error(event)
    }


  }

  function handleStopRecording() {
    if(speechRecognition){
      speechRecognition.stop()
      setIsRecording(false)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 p-5 gap-3 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-600">
          <span className="text-sm font-medium text-slate-200">Adicionar nota</span>
          <p className="text-sm leading-6 text-slate-400">
            Grave uma nota em áudio que será convertida para texto automaticamente.
          </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60" />
        <Dialog.Content className="overflow-hidden fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
          
          <Dialog.Close className='absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100'>
            <X className='size-5'/>
          </Dialog.Close>
          
          <form className='flex flex-col flex-1'>

            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>
              {showOnBoarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button 
                    type='button'
                    onClick={handleStartRecording}
                    className='font-medium text-lime-400 hover:underline'>
                    gravando uma nota
                  </button> 
                  {" "}em áudio ou se preferir{" "} 
                  <button 
                    type='button'
                    onClick={handleSelectOnlyText}
                    className='font-medium text-lime-400 hover:underline'>
                    utilize apenas texto
                  </button>.
                </p>
              ) : (
                <textarea 
                  autoFocus 
                  className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                  onChange={handleContentChanged}
                  value={content}
                />
              )}
              
            </div>
            
            {!isRecording ? (
              <button 
                type='button' 
                onClick={handleSaveNote}
                className='w-full py-4 text-center text-sm bg-lime-400 text-lime-950 outline-none font-medium hover:brightness-75'>
                Salvar nota
              </button>
            ) : (
              <button 
                type='button' 
                onClick={handleStopRecording}
                className='w-full py-4 flex items-center gap-2 justify-center text-center text-sm bg-slate-900 text-slate-300 outline-none font-medium hover:brightness-75'>
                <div className='size-3 rounded-full bg-red-600 animate-pulse'/>
                Gravando! (clique para parar a gravação)
              </button>
            )}
            
          </form>
          
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}