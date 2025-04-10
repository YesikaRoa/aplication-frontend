import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const ModalSendInformation = ({ visible, setVisible, title, message, onSend }) => {
  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="SendInformationModalLabel"
    >
      <CModalHeader>
        <CModalTitle id="SendInformationModalLabel">{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>{message}</p>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={() => {
            onSend()
            setVisible(false)
          }}
        >
          Enviar
        </CButton>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalSendInformation
