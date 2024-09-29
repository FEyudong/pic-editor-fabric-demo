import { useEffect, useRef, useState } from 'react'
import * as fabric from 'fabric' // v5
import {initAligningGuidelines,initCenteringGuidelines} from './lib.js'
import './App.css'

const FabricJSCanvas = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null)
  const canvas = useRef<fabric.Canvas>()
  useEffect(() => {
    canvas.current = new fabric.Canvas(canvasEl.current as HTMLCanvasElement, {
      backgroundColor: '#fff',
    })
    initAligningGuidelines(canvas.current)
    initCenteringGuidelines(canvas.current)
    return () => {
      canvas.current?.dispose()
    }
  }, [])

  const handleAddLayer = async (type: 'text' | 'image') => {
    if (type === 'text') {
      const text = new fabric.FabricText('Hello World', {
        left: 100,
        top: 100,
        fill: 'red',
        fontSize: 40,
      })
      canvas.current!.add(text)
    }
    if (type === 'image') {
     const image = await fabric.FabricImage.fromURL(
        'https://image.uc.cn/s/uae/g/2p/image-tools/place-holder-image.png?height=150',
        {
          crossOrigin: 'anonymous',
        }
      )
      canvas.current!.add(image)
    }
  }

  const [previewUrl, setPreviewUrl] = useState<string>()
  const handleExport = () => {
    console.log(canvas.current?.toJSON())
    setPreviewUrl(canvas.current?.toDataURL())
  }
  return (
    <div className='container'>
      <div className='left'>
        <button onClick={() => handleAddLayer('text')}>文字</button>
        <button onClick={() => handleAddLayer('image')}>图片</button>
        <button onClick={handleExport}>导出</button>
        <img src={previewUrl} />
      </div>
      <div className='center'>
        <canvas
          width='500'
          height='500'
          ref={canvasEl}
          style={{ border: '1px solid #ccc' }}
        />
      </div>
      <div className='right'></div>
    </div>
  )
}

export default FabricJSCanvas
