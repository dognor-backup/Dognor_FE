export const maskPhoneNumber = (phone) => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
};

export const maskEmail = (email) => {
    return email.replace(/(.+)(?=@)/, (match) => {
      const length = match.length;
      const maskCount = Math.ceil(length / 2); 
      const visibleCount = length - maskCount; 
  
      const visiblePart = match.slice(0, visibleCount); 
      const maskedPart = "*".repeat(maskCount); 
      return visiblePart + maskedPart;
    });
  };