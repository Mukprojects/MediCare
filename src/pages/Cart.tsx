import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, Plus, Minus, ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  
  // Calculate total with tax
  const totalWithTax = totalPrice + (totalPrice * 0.08);

  const handleCheckoutStart = () => {
    setShowPayPal(true);
  };

  const handlePaymentSuccess = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Order Placed!",
        description: "Your payment was successful and your order has been placed.",
      });
      clearCart();
      setIsCheckingOut(false);
      setShowPayPal(false);
    }, 1000);
  };

  const handlePaymentError = () => {
    toast({
      variant: "destructive",
      title: "Payment Failed",
      description: "There was a problem processing your payment. Please try again.",
    });
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link to="/pharmacy">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" asChild className="pl-0">
          <Link to="/pharmacy" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items ({items.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Product</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="h-14 w-14 bg-gray-100 rounded-md flex items-center justify-center">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="max-h-12 max-w-12 object-contain" 
                          />
                        </div>
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input 
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-14 h-8 text-center"
                          />
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">Rs {item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-medium">
                        Rs {(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4} className="text-right font-medium">
                      Total
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      Rs {totalPrice.toFixed(2)}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rs {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Free
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>Rs {(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>Rs {totalWithTax.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              {!showPayPal ? (
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleCheckoutStart}
                  disabled={isCheckingOut}
                >
                  Proceed to Checkout
                </Button>
              ) : (
                <PayPalScriptProvider options={{ 
                  "client-id": "AbiW2sQscb1VrFziuv9wCE2y2lZb80eUDOvBFwOfYrsOb7pDYVmdS3AirA4nKNcmF4rWVvKY16pWwi2t",
                  currency: "USD"
                }}>
                  <PayPalButtons
                    style={{ layout: "vertical", color: "blue" }}
                    disabled={isCheckingOut}
                    forceReRender={[totalWithTax]}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              // Converting to USD for PayPal (assuming 1 Rs = 0.012 USD)
                              value: (totalWithTax * 0.012).toFixed(2),
                              currency_code: "USD"
                            },
                            description: "Medical supplies purchase"
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then(() => {
                        handlePaymentSuccess();
                      });
                    }}
                    onError={handlePaymentError}
                  />
                </PayPalScriptProvider>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
