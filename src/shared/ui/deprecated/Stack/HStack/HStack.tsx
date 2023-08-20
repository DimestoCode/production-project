import { Flex, IFlexProps } from "../Flex/Flex";

type HStackProps = Omit<IFlexProps, "direction">;

/**
 * Component is obsolete, new components are supposed to be used
 * @deprecated
 */
export const HStack = ({ children, ...rest }: HStackProps) => {
    return (
        <Flex {...rest} direction="row">
            {children}
        </Flex>
    );
};
