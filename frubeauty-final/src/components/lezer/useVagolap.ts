import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Másolás vágólapra, három fokozatban.
 *
 * MIÉRT NEM ELÉG A `navigator.clipboard.writeText`: nem biztonságos kontextusban
 * (http), régebbi mobil böngészőben, és letiltott vágólap-engedélynél eldobja
 * magát. Ha ilyenkor csak elnyeljük a hibát, a gomb NÉMA marad — a vendég
 * megnyomja, nem történik semmi, és azt hiszi, elromlott. Épp a foglalás előtti
 * másodpercben.
 *
 * A három fokozat:
 *   1. `navigator.clipboard.writeText` — a rendes út,
 *   2. rejtett textarea + `document.execCommand('copy')` — a régi út, ami ott is
 *      megy, ahol az első nem,
 *   3. ha mindkettő elbukik, `kezi = true`: a hívó kiteszi a szöveget egy
 *      kijelölhető mezőbe, hogy a vendég kézzel másolhassa. Sosem marad üres
 *      kézzel.
 */
export function useVagolap(idozites = 2400) {
  const [masolva, setMasolva] = useState(false);
  const [kezi, setKezi] = useState(false);
  const idozito = useRef(0);

  useEffect(() => () => window.clearTimeout(idozito.current), []);

  const masol = useCallback(
    async (szoveg: string) => {
      const sikerJelzes = () => {
        setKezi(false);
        setMasolva(true);
        window.clearTimeout(idozito.current);
        idozito.current = window.setTimeout(() => setMasolva(false), idozites);
      };

      try {
        await navigator.clipboard.writeText(szoveg);
        sikerJelzes();
        return;
      } catch {
        // megy tovább a második fokozatra
      }

      try {
        const ta = document.createElement('textarea');
        ta.value = szoveg;
        // A képernyőn kívülre tesszük, de NEM `display:none`-nal: abból nem
        // lehet kijelölni, tehát a másolás is elbukna.
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const siker = document.execCommand('copy');
        document.body.removeChild(ta);
        if (siker) {
          sikerJelzes();
          return;
        }
      } catch {
        // megy tovább a harmadik fokozatra
      }

      setMasolva(false);
      setKezi(true);
    },
    [idozites],
  );

  return { masolva, kezi, masol };
}
