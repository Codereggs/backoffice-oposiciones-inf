# monitor.sh
#
# Este script monitorea las páginas web que se encuentran en el archivo pages.list
# y crea su snapshot dentro del directorio pages
#
# El tiempo de monitoreo es de 3 meses, o sea, los archivos de más de 3 meses se van eliminando
#

SECONDS=0
DATE=`date '+%Y-%m-%d_%H.%M.%S'`
HOMEPLACE="/home/mobaxterm/monitor"
MONPLACE="pages"

cd $HOMEPLACE

if [ ! -f "monitor-pages.txt" ]
then
   echo "Error fatal: No existe el archivo de parametro $HOMEPLACE/monitor-pages.txt"
   echo "se detiene el proceso"
   exit 1
fi

echo "Iniciado el proceso de monitoreo de: $DATE"

## Limpia los directorios con mas de 90 dias
find $HOMEPLACE/$MONPLACE/ -type d -mtime +90 -exec rm -rf {} \;

I=1

for PAGE in `cat monitor-pages.txt`
do
  MDIR=$I/$DATE
  echo "Procesando: Pagina "$I$": "$PAGE
  echo "En el directorio: $MDIR"
  cd $HOMEPLACE/$MONPLACE
  mkdir -p $MDIR
  if cd $MDIR
  then
     wget -E -H -k -K -p -nd -nH --no-check-certificate -e robots=off "$PAGE" &> "monitor-page.log"
  fi
  ((I=$I+1))
done

ESECONDS=$SECONDS
((MIN=$ESECONDS/60))
((SEC=$ESECONDS%60))
echo "Proceso finalizado en $MIN Minutos y $SEC Segundos."
exit 0

