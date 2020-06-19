const onError = (error) => {
  let message = error.toString();

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    message = error.message;
  }

  alert(message);
}

export default onError
