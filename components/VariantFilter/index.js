import { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import useClasses from 'lib/hooks/useClasses'
import Button from 'components/Button'

import styles from './index.module.scss'

const deformat = a => a

const VariantFilter = ({ data, schema, lookup, onChange, className, components, sortValues, selectedValues, ...props }) => {
	// Generate option names lookup table if not provided
	const _lookup = useMemo(() => {
		if (lookup) return lookup
		const l = {}
		schema.forEach(s => {
			s.options.forEach(o => {
				l[o.id] = o.name
			})
		})
		return l
	}, [schema, lookup])

	// Create prop fields from data + schema combination
	const propFields = useMemo(() => {
		const fields = []
		// iterate over data items (variant groups)
		data.forEach(variant => {
			// iterate over schema
			schema.forEach(({ id, name, format }) => {
				const value = variant.options[id]
				if (!value) {
					console.log(`Error in ${props.id} - variant is missing property '${name}' (${id})\n`, { schema, variant })
					return
				}

				let propField = fields.find(p => p.id === id)
				if (!propField) {
					propField = { id, name, values: [], format: format || deformat }
					fields.push(propField)
				}
				const { values } = propField

				if (!values.includes(value)) {
					values.push(value)
					values.sort()
				}
			})
		})
		return fields
	}, [data, schema])

	useEffect(() => {
		propFields.forEach(f => {
			if (f.values.length === 1) {
				onChange({ [f.id]: f.values[0] })
			}
		})
	}, [propFields])

	const availableValues = useMemo(() => {
		const _availableValues = {}
		// Loop over selected values
		propFields.forEach(({ id }) => {
			// Filter items by all props except this one

			// here we remove secondary values
			const filteredData = VariantFilter.filterData(data, schema, { ...selectedValues, [id]: null })

			// Push values for this prop from filtered products
			const values = []
			filteredData.forEach(dataItem => {
				const value = dataItem.options[id]
				if (!values.includes(value)) values.push(value)
			})
			_availableValues[id] = values
		})
		return _availableValues
	}, [schema, propFields, selectedValues])

	const onValueClick = e => {
		let { prop, value } = e.currentTarget.dataset
		const _selected = { ...selectedValues }

		const var_group = schema.find(group => group.id === prop)

		// toggle
		value = _selected[prop] === value ? null : value

		// if option is being turned on and it's vargroup is primary
		if (value && var_group.primary) {
			// filter by primary only
			const contrafiltered = VariantFilter.filterData(data, schema, { [var_group.id]: value })

			// lookup selected
			for (const vgrp in _selected) {
				const optn = _selected[vgrp]
				let found = false
				if (optn !== null) {
					// option selected, check if there's any variant that matches both
					for (const variant of contrafiltered) {
						if (variant.options[vgrp] === optn) {
							// it's ok
							found = true
						}
					}
				}
				if (!found) {
					_selected[vgrp] = null
					// uncheck conflicting option
				}
			}
		}
		// finally apply toggle
		_selected[prop] = value
		const options = _selected

		onChange(options)
	}

	const rows = useMemo(
		() =>
			availableValues
				? propFields.map(({ id, name, values, format }) => {
						const Comp = components && name in components ? components[name] : Button

						/* 
						I added this custom sorting in the filter but actually
						it should happen during data fetching and normalization
						In cache.js fetchProducts

						TODO: I only wrote a size sort but you should do color sorting as well
						*/
						if (sortValues && name in sortValues) {
							values = [...values]
							values.sort(sortValues[name])
						}

						const onlyOption = values.length === 1

						return (
							<div className={`${styles.row} ${styles['prop_' + name.toLowerCase()]}`} key={id}>
								{props.labels && <div className={styles.label}>{name}</div>}
								<div className={styles.options}>
									{values.map(v => {
										let selected
										let disabled
										if (onlyOption) {
											selected = true
											disabled = false
										} else {
											selected = selectedValues[id] === v
											disabled = props.disabled || !availableValues[id].includes(v)
										}
										const vName = _lookup[v]
										return (
											<Comp
												key={'k' + v}
												className={[
													styles.option_item,
													selected && styles.selected,
													disabled && styles.disabled,
													onlyOption && styles.only_option,
												]}
												data-prop={id}
												data-value={v}
												data-selected={selected}
												data-disabled={disabled}
												data-only-option={onlyOption}
												onClick={onValueClick}
												disabled={disabled}
												selected={selected}
												value={vName}
											>
												{format(vName)}
											</Comp>
										)
									})}
								</div>
							</div>
						)
				  })
				: null,
		[propFields, selectedValues, availableValues, props.disabled]
	)

	const cls = useClasses(styles.variant_filter, className)

	return (
		<div className={cls} id={props.id}>
			{rows}
		</div>
	)
}

VariantFilter.filterData = (data, schema, props = {}) =>
	data.filter(dataItem => {
		for (const id in props) {
			const var_group = schema.find(group => group.id === id)
			if (!var_group) {
				console.log('Error context', { id, props, schema })
				throw Error('var_group not found')
			}
			const value = props[id]
			if (value && value !== dataItem.options[id]) {
				if (var_group.primary) return false
				return true
			}
		}
		return true
	})

VariantFilter.propTypes = {
	data: PropTypes.array.isRequired,
	schema: PropTypes.array.isRequired,
	onChange: PropTypes.func,
	selectedValues: PropTypes.object,
	labels: PropTypes.bool,
}

VariantFilter.defaultProps = {
	onChange: () => console.warn('onChange handler not implemented'),
	labels: false,
}

export default VariantFilter
