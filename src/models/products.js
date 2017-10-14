function Product(name, price, category)
{
    this.name = name;
    this.price = price;
    this.category = category;
}

function Book()
{
    return new Product("book", 17.99, "book");
}

function PotatoChips()
{
    return new Product("potato chips", 3.99, "food");
}

function Pencil()
{
    return new Product("pencil", 2.99, "stationery");
}

function Shirt()
{
    return new Product("shirt", 29.99, "clothing");
}