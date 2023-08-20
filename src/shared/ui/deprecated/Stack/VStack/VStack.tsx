import { Flex, IFlexProps } from "../Flex/Flex";

type VStackProps = Omit<IFlexProps, "direction">;

/**
 * Component is obsolete, new components are supposed to be used
 * @deprecated
 */
export const VStack = ({ children, align = "start", ...rest }: VStackProps) => {
    return (
        <Flex {...rest} align={align} direction="column">
            {children}
        </Flex>
    );
};
