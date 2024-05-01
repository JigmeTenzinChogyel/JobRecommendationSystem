export const postDate = (input: string) => {
    const date = new Date(input);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
  
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
  
    if (diff < minute) {
      const seconds = Math.floor(diff / 1000);
      return `${seconds} seconds ago`;
    } else if (diff < hour) {
      const minutes = Math.floor(diff / minute);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diff < day) {
      const hours = Math.floor(diff / hour);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  };