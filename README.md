# WrapperTracker

## Database structure

### nutritional_information
name | UUID | timestamp | kcal | proteins | carbohydrates | sugars | fat | fibre | salt | note
-|-|-|-|-|-|-|-|-|-|-
`STRING` | `STRING` | `DATETIME/INT` | `FLOAT` | `FLOAT` | `FLOAT` | `FLOAT` | `FLOAT` | `FLOAT` | `FLOAT` | `STRING`

### consumptions

nutritional_reference | UUID | timestamp | portion_size | location | activity | note
-|-|-|-|-|-|-
`nutritional_information.UUID` | `STRING` | `DATETIME/INT` | `FLOAT` | `STRING` | `STRING` | `STRING`
