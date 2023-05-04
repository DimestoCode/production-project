import { Flex, IFlexProps } from "../Flex/Flex";

type HStackProps = Omit<IFlexProps, "direction">;

export const HStack = ({ children, ...rest }: HStackProps) => {
    return (
        <Flex {...rest} direction="row">
            {children}
        </Flex>
    );
};
