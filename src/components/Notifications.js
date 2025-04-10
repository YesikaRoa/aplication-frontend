class Notifications {
  static showAlert(setAlert, message, type = 'info') {
    setAlert({ message, type })
    setTimeout(() => {
      setAlert(null)
    }, 3000)
  }
}

export default Notifications
