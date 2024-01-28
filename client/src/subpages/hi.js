// Get the current date and time in Indian Standard Time (IST)
const currentISTTime = new Date().toLocaleString('en-IN', {
  timeZone: 'Asia/Kolkata',
});

// Format the IST time as a string without separators, AM/PM, and spaces (e.g., "20240118102346")
const formattedISTTime = currentISTTime.replace(/[/,:\sAPMapm]/g, '');

console.log(formattedISTTime);
