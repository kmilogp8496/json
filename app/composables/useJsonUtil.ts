export const useJsonUtil = (handler: (value: string) => Promise<string> | string, {
  errorMessage = 'An error occurred while processing the JSON data.',
  inputRef = ref(''),
  outputRef = ref(''),
}) => {
  const input = inputRef
  const output = outputRef
  const loading = ref(false)
  const toast = useToast()

  const handle = async () => {
    try {
      loading.value = true
      output.value = await handler(input.value)
    }
    catch (error) {
      let message = errorMessage

      if (error instanceof Error && !(error instanceof SyntaxError)) {
        message = error.message
      }

      toast.add({
        title: 'Error',
        description: message,
        icon: 'i-heroicons-information-circle',
        color: 'red',
      })
    }
    finally {
      loading.value = false
    }
  }

  return {
    input,
    handle,
    loading,
    output,
  }
}
