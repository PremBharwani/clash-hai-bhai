export const getCredits = (credits: string): number => {
    let c = 0;
    let d = 1;
    for(let i=credits.length-2;i>=0 && credits[i]!='(';i-=1){
      c = c+Number(credits[i])*d;
      d = d*10;
    }
    return c;
}

export function removeLastChars(str: string): string {
  while(str.length>0 && str[str.length-1] >= 'A'){
      str = str.slice(0,-1)
  }
  return str
}