import * as React from "react";
import { Accordion, Icon } from "semantic-ui-react";

export interface AccordionPanelProps {
  activeIndex: any;
  index: number;
  handleClick: () => void;
  label: any;
  accordionContent: any;
  accordionTitle: any;
}
export const AccordionPanel: React.FC<AccordionPanelProps> = ({
  activeIndex,
  index,
  handleClick,
  label,
  accordionContent,
  accordionTitle,
}) => {
  return (
    <Accordion>
      <Accordion.Title active={activeIndex} index={index} onClick={handleClick}>
        <Icon name={label} />
        {accordionTitle}
      </Accordion.Title>
      <Accordion.Content active={activeIndex}>{accordionContent}</Accordion.Content>
    </Accordion>
  );
};
