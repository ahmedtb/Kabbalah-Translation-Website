import Button from '@restart/ui/esm/Button'
import React from 'react'
import { FormControl } from 'react-bootstrap'

export function SelectFilter(props) {
    const options = props.options
    const [selectedOption, setSelectedOption] = React.useState()

    const fetchPage = props.fetchPage
    const property = props.property
    const label = props.label
    const defaultValue = props.defaultValue

    const valueKeyWord = props.valueKeyWord
    const nameKeyWord = props.nameKeyWord

    return <div className='d-flex flex-row'>
        <select
            className="form-control"
            onChange={(e) => { setSelectedOption(e.target.value); }}
            defaultValue={defaultValue ?? 'undefined'}
        >
            <option value={'undefined'}>{label ?? ''}</option>
            {
                options?.map((option, index) => (
                    <option key={index} value={option[valueKeyWord ?? 'value']}>{option[nameKeyWord ?? 'name']}</option>
                ))
            }
        </select>
        <button className="form-control btn btn-success ml-1" onClick={() => {
            let params = Object.assign({},
                selectedOption === 'undefined' ? { [property]: undefined } : { [property]: selectedOption },
            )
            fetchPage(params)
        }}>
            فلترة
        </button>
    </div>
}

export function NumberFilter(props) {
    const params = props.params
    const fetchPage = props.fetchPage
    const property = props.property
    const label = props.label

    const [number, setnumber] = React.useState(null)

    return (
        <div className="col-5 border rounded p-1 mx-2">
            <div className="d-flex flex-row my-2 align-items-center">
                <label>{label ?? property}</label><br />
                <input className="form-control ml-1" type="number" onChange={(e) => setnumber(e.target.value)} /><br />
                <button className="col-2 form-control btn btn-success ml-1" onClick={() => {
                    let newparams = Object.assign({},
                        number === null ? null : { [property]: number },
                    )
                    fetchPage({ ...params, ...newparams })
                }}>فلترة</button>
            </div>

        </div>
    )
}


export function ScopeFilter(props) {
    // const params = props.params
    const fetchPage = props.fetchPage
    const property = props.property
    const label = props.label
    let linkParams = Object.fromEntries(new URLSearchParams(location.search))

    return (
        <div className="col-5 border rounded p-1 mx-2">
            <div className="d-flex flex-row my-2 align-items-center">
                <button
                    type="button"
                    className={(linkParams?.[property] == 'true') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"}
                    onClick={() => fetchPage(linkParams[property] == 'true' ? { ...linkParams, [property]: undefined } : { ...linkParams, [property]: 'true' })}
                >
                    {label ?? property}
                </button>

            </div>

        </div>
    )
}

export function DateFilter(props) {
    const params = props.params
    const fetchPage = props.fetchPage
    const property = props.property
    const label = props.label

    const [date, setdate] = React.useState(null)

    return (
        <>
            <div className="col-5 border rounded p-1 m-2">
                <div className="d-flex flex-row my-2 align-items-center">
                    <label>{label ?? property}</label><br />
                    <input className="form-control ml-1" type="date" onChange={(e) => setdate(e.target.value)} /><br />
                    <button className="col-2 form-control btn btn-success ml-1" onClick={() => {
                        let newparams = Object.assign({},
                            date === null ? null : { [property]: date },
                        )
                        fetchPage({ ...params, ...newparams })
                    }}>فلترة</button>
                </div>

            </div>
        </>
    )
}

export function TextFilter(props) {
    // const params = props.params
    const fetchPage = props.fetchPage
    const property = props.property
    const label = props.label

    const [text, settext] = React.useState(null)

    return (
        <div className="d-flex flex-row border rounded p-2 my-2 justify-content-around">
            <label className="">{label ?? property}</label>
            <FormControl as='input' type="text" onChange={(e) => settext(e.target.value)} />
            <Button className="btn btn-success" onClick={() => {
                let newparams = Object.assign({}, text === null ? null : { [property]: text })
                fetchPage({ ...newparams })
            }}>
                بحث
            </Button>
        </div>
    )
}

export function OrderByDescFilter(props) {
    const params = props.params
    const fetchPage = props.fetchPage
    const property = props.property
    const label = props.label

    // const [trait, settrait] = React.useState(null)

    return (
        <>
            <div className="col-5 border rounded p-1 m-2">
                <div className="d-flex flex-row my-2 align-items-center">
                    <button
                        type="button"
                        className={(params?.orderByDesc == property) ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"}
                        onClick={() => fetchPage(params['orderByDesc'] == property ? { ...params, orderByDesc: undefined } : { ...params, orderByDesc: property })}
                    >
                        {label ?? property}
                    </button>
                </div>

            </div>
        </>
    )
}