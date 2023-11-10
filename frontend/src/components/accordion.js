import { useState } from 'react';
import '../accordion.css'

const AccordionSection = ({section,isActiveSection, setActiveIndex, sectionIndex }) => {
    const toggleSection = () => {
        const nextIndex = isActiveSection ? null : sectionIndex;
        setActiveIndex(nextIndex);
    }

    return ( <div>
            <div className='accordionTitleStyles' onClick={toggleSection}>
                <div>{section.title}</div>
                <div>{isActiveSection ? '-' : '+' }</div>
            </div>
            {isActiveSection && <div className='accordionContentStyles'>{section.content}</div>}
        </div>
    );
};

const Accordion = ({ sections }) => {
    const [activeIndex, setActiveIndex] = useState(0);
return (
    <div className='accordionStyles'>
        {sections.map((section, index) => (
          <AccordionSection 
          section={section} 
          key={index} 
          isActiveSection={index === activeIndex} 
          setActiveIndex={setActiveIndex}
          sectionIndex={index}   />  
        ))}
    </div>
    );
};

export default Accordion;