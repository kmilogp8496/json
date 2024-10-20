export const useMultipleJsonUtil = (handler: (firstValue: string, secondValue: string) => { original: string, modified: string }, {
  errorMessage = 'An error occurred while processing the JSON data.',
  firstInputRef = ref(''),
  secondInputRef = ref(''),
  outputRef = ref({
    original: '',
    modified: '' },
  ),
}) => {
  const firstInput = firstInputRef
  const secondInput = secondInputRef
  const output = outputRef
  const loading = ref(false)
  const toast = useToast()

  const handle = async () => {
    try {
      loading.value = true
      output.value = handler(firstInput.value, secondInput.value)
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
  }
}
