import { CheckboxCard, Stack } from "@chakra-ui/react"
import "./Questionnaire.css"

function Questionnaire(){
    return(
        <div>
            <div>
                <h1>Diagnostic Questionnaire</h1>
                <hr/>
                <p>Question 1 of 6</p>
                <h2>What stage is your startup currently in?</h2>

                <div style={{width: "100%", height: "20px", backgroundColor: "#e5e7eb", borderRadius: "4px", marginBottom: "24px"}}>
                    <div style={{width: "17%", height: "100%", backgroundColor: "#3b82f6", borderRadius: "4px"}}></div>
                </div>

                <Stack gap="3">
                    <CheckboxCard.Root>
                        <CheckboxCard.HiddenInput />
                        <CheckboxCard.Control>
                            <CheckboxCard.Indicator />
                            <CheckboxCard.Label className="text-black">Pre-seed / Ideation</CheckboxCard.Label>
                        </CheckboxCard.Control>
                    </CheckboxCard.Root>
                    <CheckboxCard.Root>
                        <CheckboxCard.HiddenInput />
                        <CheckboxCard.Control>
                            <CheckboxCard.Indicator />
                            <CheckboxCard.Label className="text-black">Seed Stage</CheckboxCard.Label>
                        </CheckboxCard.Control>
                    </CheckboxCard.Root>
                    <CheckboxCard.Root>
                        <CheckboxCard.HiddenInput />
                        <CheckboxCard.Control>
                            <CheckboxCard.Indicator />
                            <CheckboxCard.Label className="text-black">Series A</CheckboxCard.Label>
                        </CheckboxCard.Control>
                    </CheckboxCard.Root>
                </Stack>
            </div>
        </div>
    );
}

export default Questionnaire;