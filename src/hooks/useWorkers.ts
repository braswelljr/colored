'use client'

import { useEffect, useMemo } from 'react'

/**
 * useWorkers - A hook to manage web workers
 * @param {string} workerPath - The path to the worker file
 * @returns {Worker} - The worker
 * @example
 * const worker = useWorkers('./worker.ts')
 * worker.postMessage('Hello World!')
 * worker.onmessage = (e) => console.log(e.data)
 * worker.terminate()
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Worker
 */
export default function useWorkers(workerPath: string): Worker {
  const workerPathUrl = new URL(workerPath, import.meta.url)
  const worker = useMemo(() => new Worker(workerPathUrl.href), [workerPathUrl.href])

  useEffect(() => {
    return () => worker.terminate()
  }, [worker])

  return worker
}
