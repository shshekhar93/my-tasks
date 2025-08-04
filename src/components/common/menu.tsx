import React, { useEffect, useState } from 'react';
import { useStyletron } from 'styletron-react';
import Button from './form/button';
import { useIsMobile } from './layout/breakpoints';
import { Flex } from './layout/flex';

export type MenuProps = {
  openCreateTaskModal: () => void;
  createBackup: () => void;
  restoreBackup: () => void;
};

export function Menu({
  openCreateTaskModal,
  createBackup,
  restoreBackup,
}: MenuProps) {
  const [css] = useStyletron();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setOpening] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isOpen) {
      setOpening(false);
      return;
    }

    setOpening(true);

    const closeMenu = (e) => {
      e.preventDefault();
      setIsOpen(false);
    };

    setTimeout(() => document.addEventListener('click', closeMenu), 0);
    return () => document.removeEventListener('click', closeMenu);
  }, [isOpen]);

  return (
    <Flex className={css({
      position: 'relative',
    })}
    >
      <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <div className={css({
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        gap: '0.5rem',
        position: isMobile ? 'fixed' : 'absolute',
        top: isMobile ? '70px' : 'calc(100% + 0.5rem)',
        right: '0',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0px 1px 8px 1px gray',

        // Transition stuff
        width: isOpening ? (isMobile ? '100%' : '250px') : 0,
        height: isOpening ? '160px' : 0,
        padding: isOpening ? '1rem' : 0,
        transition: 'height 0.2s ease-in-out, width 0.2s ease-in-out, padding 0.2s ease-in-out',
        overflow: 'hidden',
      })}
      >
        {isOpen && (
          <>
            <Button
              type="tertiary"

              onClick={openCreateTaskModal}
              label="Create Task"
            />
            <Button
              type="tertiary"
              onClick={createBackup}
              label="Backup"
            />
            <Button
              type="tertiary"
              onClick={restoreBackup}
              label="Restore"
            />
          </>
        )}
      </div>
    </Flex>
  );
}

export function Hamburger({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  const [css] = useStyletron();
  return (
    <Flex
      gap="8px"
      flexDirection="column"
      className={css({
        position: 'relative',
        width: '28px',
        height: '22px',
      })}
      onClick={onClick}
      tabIndex={0}
    >
      <div className={css({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        borderBottom: 'solid white 3px',
        transform: isOpen ? 'rotate(45deg)' : undefined,
        transformOrigin: 'top left',
        transition: 'transform 0.2s ease-in-out',
      })}
      />
      <div className={css({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 'calc(50% - 2px)',
        borderBottom: 'solid white 3px',
        opacity: isOpen ? 0 : 1,
        transition: 'opacity 0.15s ease-in-out',
      })}
      />
      <div className={css({
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderBottom: 'solid white 3px',
        transform: isOpen ? 'rotate(-45deg)' : undefined,
        transformOrigin: 'bottom left',
        transition: 'transform 0.2s ease-in-out',
      })}
      />
    </Flex>
  );
}
