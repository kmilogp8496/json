export const useMultipleJsonUtil = (handler: (firstValue: string, secondValue: string) => { output: string, numberOfLines: number[] }, {
  errorMessage = 'An error occurred while processing the JSON data.',
  firstInputRef = ref(''),
  secondInputRef = ref(''),
  outputRef = ref(''),
}) => {
  const firstInput = firstInputRef
  const secondInput = secondInputRef
  const output = outputRef
  const numberOfLines = ref<number[]>([])
  const loading = ref(false)
  const toast = useToast()

  const handle = async () => {
    try {
      loading.value = true
      const handlerOutput = handler(firstInput.value, secondInput.value)

      output.value = handlerOutput.output
      numberOfLines.value = handlerOutput.numberOfLines
    }
    catch (error) {
      let message = errorMessage

      if (error instanceof Error) {
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
    firstInput,
    secondInput,
    handle,
    loading,
    output,
    numberOfLines,
  }
}
