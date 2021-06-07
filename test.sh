ARG=`ruby -e "puts 100.times.map{rand(-500..500)}.join(' ')"`
node index.js $ARG | node checker.js $ARG
