import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

export default function NewNoteCard () {
  const [showOnBoarding, setShowOnBoarding] = useState(true)
  const [content, setContent] = useState('')

  function handleSelectOnlyText() {
    setShowOnBoarding(false)
  }

  function handleContentChanged(event:ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if(event.target.value == ''){
      setShowOnBoarding(true)
    }
  }

  function handleSaveNote(event:FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if(content !== ''){
      toast.success('Nota criada com sucesso !')
    } else {
      toast.error('Impossível criar uma nota vazia.')
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
        <Dialog.Content className="overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          
          <Dialog.Close className='absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100'>
            <X className='size-5'/>
          </Dialog.Close>
          
          <form onSubmit={handleSaveNote} className='flex flex-col flex-1'>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>
              {showOnBoarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button className='font-medium text-lime-400 hover:underline'>
                    gravando uma nota
                  </button> 
                  {" "}em áudio ou se preferir{" "} 
                  <button 
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
                />
              )}
              
            </div>

            <button type='submit' className='w-full py-4 text-center text-sm bg-lime-400 text-lime-950 outline-none font-medium hover:brightness-75'>
              Salvar nota
            </button>
          </form>
          
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}