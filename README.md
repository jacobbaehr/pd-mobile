# PoolDash

# To Begin:

`git pull`

`yarn install`

`tsc -w`

`react-native start` (in a separate terminal window)

`react-native run-ios`


# Calculations
## V1 -- 2010
The first version of Pool Doctor only supported 3 readings and recommended up to 3 chemicals, with no substitutions. It used linear calculations based on average effects within optimal ranges.

`(free_chlorine_target - free_chlorine) * chemical_multiplier * pool_volume = ounces of 67% calcium hypochlorite`

### Target range problem
Most chemicals have ideal ranges, not a single value that you should try to hit. So, the free chlorine should be between 2.0 and 4.0, and we should only make an adjustment when it falls outside of that range (and in this case, shoot for exactly 3.0).

### Non-linear problem
Some chemicals are measured in ppm (parts-per-million). With these, there is a constant, straight relationship between the amount of free chlorine you put into the pool, and the value of that reading (because you're just putting more "parts" in). To raise the free chlorine from 1.0 to 2.0 requires the same amount of chemical as raising it from 2.0 to 3.0.

However, chemicals like pH work differently. As you add more Sodium Bicarbonate, the reading value approaches 8.4 asymptotically, meaning that it requires significantly more chemicals to 

This was a decent solution, and for most people, it was an improvement over their existing system. However, I knew I could do better.

This was, honestly, an improvement for most people. more thought than most people already put into their pool

## V2 -- 2012
