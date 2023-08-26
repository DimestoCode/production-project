// import { action } from "@storybook/addon-actions";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { Button } from "../../../Button/Button";
// import { Menu } from "./Menu";

// export default {
//     title: "shared/Menu",
//     component: Menu,
//     argTypes: {
//         backgroundColor: { control: "color" }
//     }
// } as ComponentMeta<typeof Menu>;

// const Template: ComponentStory<typeof Menu> = (args) => (
//     <div style={{ padding: 50 }}>
//         <Menu {...args} />
//     </div>
// );
// export const BottomRight = Template.bind({});
// BottomRight.args = {
//     items: [
//         {
//             label: "Leab",
//             onClick: action("option 1")
//         },
//         {
//             label: "Leab",
//             onClick: action("option 1")
//         }
//     ],
//     triggerEl: <Button>Open</Button>
// };

// // TODO: story cases for menu
// export const BottomLeft = Template.bind({});
// BottomLeft.args = {
//     items: [
//         {
//             label: "Leab",
//             onClick: action("option 1")
//         },
//         {
//             label: "Leab",
//             onClick: action("option 1")
//         }
//     ],
//     triggerEl: <Button>Open</Button>,
//     direction: "bottom-left"
// };

// export const TopRight = Template.bind({});
// TopRight.args = {
//     items: [
//         {
//             label: "Leab",
//             onClick: action("option 1")
//         },
//         {
//             label: "Leab",
//             onClick: action("option 1")
//         }
//     ],
//     triggerEl: <Button>Open</Button>,
//     direction: "top-right"
// };

// export const TopLeft = Template.bind({});
// TopLeft.args = {
//     items: [
//         {
//             label: "Leab",
//             onClick: action("option 1")
//         },
//         {
//             label: "Leab",
//             onClick: action("option 1")
//         }
//     ],
//     triggerEl: <Button>Open</Button>,
//     direction: "top-left"
// };
