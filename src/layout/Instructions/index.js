import { useEffect, useState } from "react";
import RobotOrders from "../../utils/controllers";
import { 
    InstructionsContainer, 
    InstructionsLabel,
    InstructionsButton, 
    InstructionsFailedMessage
} from "./Instructions.styles";

let X_BOUNDS = 5;
let Y_BOUNDS = 3;
let robotsList = [];

const Instructions = ({ onRobots }) => {
    const [localInstructions, setLocalInstructions] = useState('');
    const [intructionsFailed, setInstructionsFailed] = useState('');
    const [robots, setRobots] = useState([]);

    useEffect(() => {
        onRobots && onRobots(robots);
    }, [robots]);

    const onSubmit = (event) => {
        event.preventDefault();

        const instructions = localInstructions.split('\n\n');

        return instructions.map((instruction, i) => {
            const currentInstruction = instruction.split('\n');

            if (i === 0 && currentInstruction.length > 2) {
                const gridBoundsDefaults = currentInstruction[0].split(' ');
                gridBoundsDefaults[0] !== X_BOUNDS && (X_BOUNDS = gridBoundsDefaults[0]);
                gridBoundsDefaults[1] !== Y_BOUNDS && (Y_BOUNDS = gridBoundsDefaults[1]);
                currentInstruction.shift();
            }

            const robot = currentInstruction[0].trim().split(' ');

            try {
                const updatedRobot =  RobotOrders(
                    { 
                        x: Number(robot[0]), 
                        y: Number(robot[1]), 
                        orientation: robot[2], 
                        isLost: false 
                    }, 
                    currentInstruction[1],
                );
                robotsList.push(updatedRobot);
                setRobots(robotsList);
                return robotsList;
            }
            catch (e) {
                console.log(e);
                setInstructionsFailed('Your instructions failed.');
            }
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <InstructionsContainer>
                <InstructionsLabel>Enter instructions:</InstructionsLabel>
                <textarea 
                    name="instructions"
                    onChange={(event) => setLocalInstructions(event.target.value)}
                    value={localInstructions}
                    rows='10'
                />
                <InstructionsFailedMessage>{intructionsFailed}</InstructionsFailedMessage>
                <InstructionsButton type="submit" value="Submit instructions" />
            </InstructionsContainer>
        </form>
    );
};

export default Instructions;
