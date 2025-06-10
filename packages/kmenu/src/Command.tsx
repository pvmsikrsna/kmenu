import React, { FC, useRef, useEffect, useState, useContext, MouseEvent } from 'react'
import useInView from './hooks/useInView'
import { useShortcut } from './hooks/useShortcut'
import { InnerCommand } from './types'
import run from './utils/run'
import { motion } from 'framer-motion'
import Checkbox from './Checkbox'
import { MenuContext } from './MenuProvider'

interface CommandProps {
  command: InnerCommand
  onMouseEnter: () => void
  isSelected: boolean
}

const Command: FC<CommandProps> = ({ onMouseEnter, isSelected, command }) => {
  const { setOpen } = useContext(MenuContext)
  const [checked, setChecked] = useState(command.checkbox?.checked)
  const topRef = useRef<HTMLSpanElement>(null)
  const bottomRef = useRef<HTMLSpanElement>(null)

  const handleSelect = () => {
    if (isSelected) handleClick()
  }

  const handleClick = (e?: MouseEvent) => {
    if (e) e.preventDefault()
    if (command.checkbox) setChecked(prev => !prev)
    run(command)
    if (command.closeOnComplete) setOpen(0)
  }

  useShortcut({ targetKey: 'Enter', handler: handleSelect })

  const inViewTop = useInView({ ref: topRef })
  const inViewBottom = useInView({ ref: bottomRef })

  useEffect(() => {
    if (isSelected && (!inViewTop || !inViewBottom)) {
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [isSelected, inViewTop, inViewBottom])

  const renderShortcuts = () =>
    command.shortcuts && (
      <div className='shortcuts'>
        {command.shortcuts.modifier && <kbd>{command.shortcuts.modifier}</kbd>}
        {command.shortcuts.keys.map((key, idx) => (
          <kbd key={idx}>{key}</kbd>
        ))}
      </div>
    )

  const renderSelected = (damping = 80) =>
    isSelected && (
      <motion.div
        layoutId='box'
        className='selected'
        initial={false}
        aria-hidden='true'
        transition={{ type: 'spring', stiffness: 1000, damping }}
      />
    )

  const renderInfo = () => (
    <div className='info_wrapper'>
      {command.icon}
      {typeof checked === 'boolean' && <Checkbox checked={checked} id={command.text} />}
      <p className='command_text'>{command.text}</p>
    </div>
  )

  return (
    <div role='option' aria-selected={isSelected}>
      <span ref={topRef} aria-hidden='true' />
      {command.anchor ? (
        <command.anchor
          className='command'
          onMouseMove={onMouseEnter}
          onClick={() => run(command)}
          href={command.href || '#'}
          target={command.newTab ? '_blank' : '_self'}
          rel='noreferrer'
        >
          {renderSelected()}
          {renderInfo()}
          {renderShortcuts()}
        </command.anchor>
      ) : (
        <a
          className='command'
          onMouseMove={onMouseEnter}
          onClick={handleClick}
          href={command.href || '#'}
          target={command.newTab ? '_blank' : '_self'}
          rel='noreferrer'
        >
          {renderSelected(70)}
          {renderInfo()}
          {renderShortcuts()}
        </a>
      )}
      <span ref={bottomRef} className='scroll_ref' aria-hidden='true' />
    </div>
  )
}

export default Command
