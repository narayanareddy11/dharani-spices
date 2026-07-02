# Dharani Spices and Masalas Website

This is a free static website for Dharani spices and masalas. It can be deployed publicly with GitHub Pages.

## Best Free Deployment

Use **GitHub Pages** for this first version.

- Free public hosting for static HTML, CSS, and JavaScript.
- Public URL like `https://yourname.github.io/your-repo`.
- Optional custom domain later.
- No server or database cost.

GitHub Pages is the best fit because this site only needs product display, prices, offers, images, and WhatsApp enquiry links.

## Change Products, Prices, Offers, and Images

Edit:

```text
data/products.json
```

Example product:

```json
{
  "name": "Garam Masala",
  "category": "Masala",
  "weight": "100 g",
  "price": 85,
  "offer": "Buy 2 Save 10%",
  "description": "Aromatic blend for gravies, curries, biryani, and daily cooking.",
  "image": "https://example.com/image.jpg"
}
```

For your own images, create an `images` folder, add files there, and use paths like:

```json
"image": "images/garam-masala.jpg"
```

## Change Phone and WhatsApp Number

Edit `app.js`:

```js
const store = {
  phoneDisplay: "+91 99999 99999",
  whatsappNumber: "919999999999",
  defaultMessage: "Hi, I want to order Indian spices and masalas.",
};
```

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Upload these files.
3. Open repository `Settings`.
4. Go to `Pages`.
5. Select deploy from branch.
6. Choose `main` and `/root`.
7. Save.

After a short wait, GitHub will show your public website URL.
