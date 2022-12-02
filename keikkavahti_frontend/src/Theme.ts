import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  components: {
    Select: {
      baseStyle: {
        field: {
            color: 'gray.500',
        },
        icon: {
          fontSize: '2xl',
        },
      },
    },
  },
})

export default theme