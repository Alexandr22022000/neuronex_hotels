## User Interface API
### AJAX
#### `AJAX.get(url, query) => Promise.then(body => {}).catch((code, body) => {})` 
#### `AJAX.post(url, body, query) => Promise.then(body => {}).catch((code, body) => {})`
Cross domain request support is necessarily!

### QUERY
#### `QUERY.params => {key: value}`
#### `QUERY.set({key: value})`
if value === undefined, remove param

### UI
Everywhere:
#### `UI.setHotel({name, address, phone, rank, reviews})`
#### `UI.setDates({start<Date>, end<Date>, nights<Number>})`

Widget and dates step:
#### `UI.onUpdateDate = (value, key) => {}`
#### `UI.onUpdateGuests = (value, key) => {}`
#### `UI.setLink(link)`
#### `UI.setGuests(humans, children)`

Apartments step:
#### `UI.setApartments([{name, description, images[], price, salePrice, link}], nights)`
if apartments === [], show msg "Sorry we don't have apartments for this dates"
if apartments === undefined, show preloader

Final step:
#### `UI.setApartment({name, description, images[], price, salePrice})`
#### `UI.setError({key: value})`
#### `UI.onUpdateInput = (value, key) => {}`
#### `UI.onFinishReservation = () => {}`

Reservation page:
#### `UI.setReservation({name, phone, email, wishes, status, humans, children})`
#### `UI.setApartment({name, description, images[], price, salePrice})`
#### `UI.onCancelReservation = () => {}`
#### `UI.setLink(link)`

