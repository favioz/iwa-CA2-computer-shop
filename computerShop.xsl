<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
                <table id="productsTable" class="indent">
                    <thead>
                        <tr>
                            <th colspan="5">ComputerShop Products</th>
                        </tr>
                        <tr>
                            <th>Select</th>
                            <th>Item</th>
                            <th>Description</th>
                            <th>Specs</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="/products/section">
                            <tr>
                                <td colspan="5">
                                    <xsl:value-of select="@name" />
                                </td>
                            </tr>
                            <xsl:for-each select="entree">
                                <tr id="{position()}"> 
                                    <td align="center">
                                        <input name="item0" type="checkbox" />
                                    </td>
                                    <td>
                                        <xsl:value-of select="item" />
                                    </td>
                                    
                                    <td>
                                        <xsl:value-of select="description" />
                                    </td>
                                    <td>
                                        <xsl:value-of select="specs" />
                                    </td>
                                    <td align="right">
                                        <xsl:value-of select="price" />
                                    </td>

                                </tr>
                            </xsl:for-each>
                        </xsl:for-each>
                    </tbody>
                </table><br/>
    </xsl:template>
</xsl:stylesheet>