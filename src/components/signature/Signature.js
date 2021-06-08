import React, { Component } from 'react'
import SignaturePad from 'react-signature-canvas'

import styles from "../../assets/css/signature/styles.module.css";

class Signature extends Component {
  state = {trimmedDataURL: null}
  sigPad = {}
  clear = () => {
    this.sigPad.clear()
    this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
      .toDataURL('image/png')})
    
  }
  trim = () => {
    this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
      .toDataURL('image/png')})
  }
  render () {
    let {trimmedDataURL} = this.state
    return <div className={styles.container}>
      <div className={styles.sigContainer}>
        <SignaturePad canvasProps={{className: styles.sigPad}}
          ref={(ref) => { this.sigPad = ref }} />
      </div>
      <div className={styles.divCenterContent}>
        <div style = {{width:"15%"}}>
          <button className={styles.buttons} onClick={this.clear}>
            Limpiar
          </button>
          <button className={styles.buttons} onClick={this.trim}>
            Firma
          </button>
        </div>
      </div>
      {trimmedDataURL
        ? <img className={styles.sigImage}
          src={trimmedDataURL} alt="Firma"/>
        : null}
    </div>
  }
}

export default Signature;
