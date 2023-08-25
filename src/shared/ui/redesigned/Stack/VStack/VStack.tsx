import { Flex, IFlexProps } from "../Flex/Flex";

type VStackProps = Omit<IFlexProps, "direction">;

export const VStack = ({ children, align = "start", ...rest }: VStackProps) => {
    return (
        <Flex {...rest} align={align} direction="column">
            {children}
        </Flex>
    );
};
