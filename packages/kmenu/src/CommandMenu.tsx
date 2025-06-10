import React, { FC, ReactNode, useContext, useEffect } from 'react'
import { useShortcut } from './hooks/useShortcut'
import { MenuContext } from './MenuProvider'
import { ActionType, MenuProps, SortedCommands } from './types'
import Command from './Command'
import { motion } from 'framer-motion'

/**
 * The main command menu component.
 *
 * @param {number} index - The hierarchial index of this palette
 * @param {CommandWithIndex[]} commands - The SORTED commands which will be displayed in this palette
 * @param {boolean} main - Whether this is the first command menu the user will see on toggle
 * @type {React.FC<MenuProps>}
 * @returns {React.ReactElement} the menu provider
 */
export const CommandMenu: FC<MenuProps> = (props) => {
  const { results, state, dispatch } = useContext(MenuContext)

  return (
    <Wrapper {...props}>
      {typeof props.loadingPlaceholder !== 'undefined' && props.loadingState
        ? props.loadingPlaceholder
        : results?.commands.map((category, index) => (
            <div key={index}>
              {category.commands.length > 0 && (
                <p className='category_header'>{category.category}</p>
              )}
              {category.commands.map((command, index) => (
                <Command
                  onMouseEnter={() =>
                    dispatch({
                      type: ActionType.CUSTOM,
                      custom: command.globalIndex,
                    })
                  }
                  isSelected={state.selected === command.globalIndex}
                  command={command}
                  key={index}
                />
              ))}
            </div>
          ))}
    </Wrapper>
  )
}

const Wrapper: FC<MenuProps & { children: ReactNode }> = (props) => {
  const {
    open,
    query,
    setQuery,
    setPlaceholder,
    results,
    setResults,
    dispatch,
    dimensions,
    setCrumbs,
    input,
  } = useContext(MenuContext)

  useEffect(() => {
    if (open === props.index)
      setPlaceholder(
        typeof props.placeholder === 'string'
          ? props.placeholder
          : 'What do you need?'
      )
  }, [open])


  // This effect runs whenever the search query, setQuery, open state, or loadingState changes.
  useEffect(() => {
    // Only run this effect if the menu is open at the current index.
    if (open !== props.index) return

    // Reset the menu selection state when the menu opens or query changes.
    dispatch({ type: ActionType.RESET, custom: 0 })

    // If there is no query or searching is prevented, reset the input and crumbs, and show all commands.
    if (!query || props.preventSearch) {
      if (!query) input.current!.value = ''
      setCrumbs(props.crumbs)
      return setResults(props.commands)
    }

    // Otherwise, filter commands based on the search query.
    let index = 0
    const sorted: SortedCommands[] = []

    // Iterate over each command category.
    props.commands.commands.forEach((row) => {
      const results: SortedCommands = {
        category: row.category,
        commands: [],
      }

      // Check each command in the category for a match with the query.
      row.commands.forEach((command) => {
        const text =
          command.text.toLowerCase() + command.keywords?.join(' ').toLowerCase()
        if (text.includes(query.toLowerCase())) {
          // If it matches, add it to the results with a global index.
          results.commands.push({ ...command, globalIndex: index })
          index++
        }
      })

      // Also check subCommands, if any, for a match.
      row.subCommands?.forEach((command) => {
        const text =
          command.text.toLowerCase() + command.keywords?.join(' ').toLowerCase()
        if (text.includes(query.toLowerCase())) {
          results.commands.push({ ...command, globalIndex: index })
          index++
        }
      })

      // Only add categories that have matching commands.
      if (results.commands.length > 0) sorted.push(results)
    })

    // Update the results state with the filtered commands and their count.
    return setResults({
      index: index,
      commands: sorted,
      initialHeight: props.commands.initialHeight,
    })
  }, [query, setQuery, open, props.loadingState])

  const upHandler = () => dispatch({ type: ActionType.DECREASE, custom: 0 })
  const downHandler = () => dispatch({ type: ActionType.INCREASE, custom: 0 })

  useShortcut({ targetKey: 'ArrowUp', handler: upHandler })
  useShortcut({ targetKey: 'ArrowDown', handler: downHandler })

  if (open !== props.index || typeof results?.index === 'undefined') return null

  return (
    <motion.div
      className='command_wrapper'
      role='listbox'
      style={{
        overflowY: results!.index >= 5 ? 'auto' : 'hidden',
        height:
          results!.index >= 5
            ? results?.initialHeight
            : props.loadingState
              ? 'auto'
              : results!.commands.length * (dimensions?.sectionHeight || 31) +
                results!.index * (dimensions?.commandHeight || 54),
      }}
    >
      {props.children}
    </motion.div>
  )
}
