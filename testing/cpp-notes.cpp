int main()
{
  return 0;
}

// DUH
// case-sensitive
// brackets must match

// whitespace doesn't matter
// ; to end lines - matters!
// not all apps are main()
// compiler errors and linker errors are different

// libraries

// stream i/o
#include <iostream>
// vs record based i/o or fixed i/o
// >> send to a stream (insertion)
// << read from a stream (extraction)

// use double quotes!!!!
// stream multiple arguments
// std::cout << "Hello1" << std::endl << 2+2;
// std is a library.
// std:: is a namespace.

// local variables
// C++ variables can have a user-defined type
// must declare variable before using it
// why? 
  // compiler needs to know type of variable before using it
  // built-in variables are not initialized for you
  // compiler enforces rule-specific types

// tell app to look for namespace vs typing std:: all the time
using namespace std;
// when not to use?

// int i;
// that does NOT initialize i;

// int i;
// i=3;
// that initializes i;

// quiz: output if you forget endl, makes 2.3 \n 3 look like 2.33
// quiz: int variable will truncate (NOT round!) to integer if given a decimal value.
// warning " "'conversion from 'double' to 'int', possible loss of data"
int i;
i = 4.3;
// 4.3 is interpreted as a double (vs a floating point)
// floating point is smaller than double
int j;
j=9/5;
// j = 1
int k;
k=9.0/5;
// k = 1.8
