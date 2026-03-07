import { CheckboxCard, For, Stack } from "@chakra-ui/react"
import { Progress } from "@chakra-ui/react"

function Questionnaire(){

    return(
        <>
        <Layout>
            <h3>Diagnostic Questionnaire</h3>
            <hr/>
            <p>Question 1 of 6</p>
            <h1>What stage is your startup currently in?</h1>
        </Layout>
        
        <Progress.Root defaultValue={17} maxW="sm">
            <HStack gap="5">
                <Progress.Label>Usage</Progress.Label>
                <Progress.Track flex="1">
                <Progress.Range />
                </Progress.Track>
                <Progress.ValueText>40%</Progress.ValueText>
            </HStack>
        </Progress.Root>

        <Stack maxW="320px">
            <For each={["sm", "md", "lg"]}>
                {(size) => (
                <CheckboxCard.Root size={size} key={size}>
                    <CheckboxCard.HiddenInput />
                    <CheckboxCard.Control>
                    <CheckboxCard.Content>
                        <CheckboxCard.Label>Checkbox {size}</CheckboxCard.Label>
                    </CheckboxCard.Content>
                    <CheckboxCard.Indicator />
                    </CheckboxCard.Control>
                </CheckboxCard.Root>
                )}
            </For>
        </Stack>

        </>
    );
}

export default Questionnaire;