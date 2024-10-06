export const apiClient = $fetch.create({
  async onResponseError(context) {
    const toast = useToast()
    console.log(context)

    toast.add({
      title: context.response._data?.statusMessage ?? 'Error',
      description: context.response._data?.message ?? 'An error occurred while calling ' + context.request,
      color: 'red',
      icon: 'i-heroicons-information-circle',
    })
  },
})
