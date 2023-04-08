import { useState } from 'react'

const BlogToggle = (props) => {
  const [visible, setVisible] = useState(false)

  const show = { display: visible ? 'none' : '' }
  const hide = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    if (visible === true) {
        setVisible(false)
    } else {
        setVisible(true)
    }
  }

  return (
    <div>
      <div style={show}>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={hide}>
        {props.children}
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
}

export default BlogToggle