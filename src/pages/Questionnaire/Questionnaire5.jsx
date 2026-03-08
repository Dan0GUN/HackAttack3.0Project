import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { CheckIcon, ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { useState } from "react"

function Q5() {
  const options = [
    "Market validation - Understanding customer needs",
    "Product development - Building the right features",
    "Regulatory compliance - Licenses and certifications",
    "Funding - Accessing capital",
    "Team building - Recruiting talent",
    "Customer acquisition - Marketing and sales",
  ]

  const [selectedOption, setSelectedOption] = useState(null)

  return (
    <Box minH="100vh" bg="white" px={{ base: 6, md: 10 }} py={6}>
      <VStack align="stretch" gap={8} maxW="900px" mx="auto">
        <HStack justify="space-between">
          <Text color="blue.900" fontSize="lg">
            Question 5 of 6
          </Text>
          <Text color="blue.900" fontSize="lg">
            83%
          </Text>
        </HStack>

        <Box w="100%" h="6px" bg="gray.100" borderRadius="full" overflow="hidden">
          <Box w="83%" h="100%" bg="black" borderRadius="full" />
        </Box>

        <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="600" pt={8}>
          What is your biggest growth barrier right now?
        </Text>

        <VStack align="stretch" gap={4} pt={6}>
          {options.map((option) => {
            const isSelected = selectedOption === option

            return (
              <Box
                key={option}
                onClick={() => setSelectedOption(option)}
                cursor="pointer"
                border="1px solid"
                borderColor={isSelected ? "black" : "gray.200"}
                borderRadius="16px"
                px={6}
                py={6}
                bg="white"
                transition="0.2s"
                _hover={{ borderColor: "gray.400" }}
              >
                <HStack justify="space-between" align="center">
                  <Text
                    fontSize="lg"
                    fontWeight={isSelected ? "600" : "500"}
                    color="blue.900"
                  >
                    {option}
                  </Text>

                  {isSelected && (
                    <Box
                      w="24px"
                      h="24px"
                      borderRadius="full"
                      bg="black"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <CheckIcon color="white" boxSize={3} />
                    </Box>
                  )}
                </HStack>
              </Box>
            )
          })}
        </VStack>

        <HStack justify="space-between" pt={8}>
          <Button variant="ghost" leftIcon={<ArrowBackIcon />}>
            Back
          </Button>

          <Button
            bg={selectedOption ? "black" : "gray.100"}
            color={selectedOption ? "white" : "gray.400"}
            rightIcon={<ArrowForwardIcon />}
            _hover={selectedOption ? { bg: "gray.800" } : {}}
            isDisabled={!selectedOption}
            borderRadius="16px"
            px={8}
          >
            Next
          </Button>
        </HStack>
      </VStack>
    </Box>
  )
}

export default Q5