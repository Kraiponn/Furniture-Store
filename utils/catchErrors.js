const CatchErrors = (error, displayError) => {
  let errorMsg;

  if(error.response) {
    errorMsg = error.response.data;
    console.error('Error response: ', errorMsg)

    // For cloudinary upload error
    if(error.response.data.error) {
      errorMsg = error.response.data.error.message;
      console.error('Error message from cloudinary: ', errorMsg)
    }
  } else if(error.request) {
    errorMsg = error.request;
    console.error('Error request: ', errorMsg);
  } else {
    errorMsg = error.message;
    console.error('Error message: ', errorMsg);
  }

  displayError(errorMsg);
}

export default CatchErrors;