import { FC } from 'react'
import { Button } from 'react-bootstrap'
import './InputField.css'

interface Props {
    value: string
    setValue: (value: string) => void
    onSubmit: () => void
    loading?: boolean
    placeholder?: string
    buttonTitle?: string
}

export const InputField: FC<Props> = ({ value, setValue, onSubmit, loading, placeholder, buttonTitle = 'Найти' }) => (
    <div className="inputField">
        <input className='inputTag' value={value} placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
        <Button className='btnInput' disabled={loading} onClick={onSubmit}>{buttonTitle}</Button>
    </div>
)

export default InputField